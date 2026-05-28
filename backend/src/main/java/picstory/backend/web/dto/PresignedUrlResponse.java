package picstory.backend.web.dto;

public record PresignedUrlResponse(
        String uploadUrl,
        String fileUrl,
        String fileName
) {
}
