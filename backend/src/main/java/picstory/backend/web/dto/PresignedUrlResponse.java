package picstory.backend.web.dto;

public record PresignedUrlResponse(
        String uploadUrl,
        String fileName,
        String contentType
) {
}
